import React, { useEffect, useState } from "react";
import { formatDistanceToNow, isToday } from 'date-fns';
import { formatEventType } from "../utils/EventType";

// Function to convert string to Pascal Case
const toPascalCase = (str) => {
    return str
        .split(/[\s\-]+/) // Split by spaces, hyphens, or underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
        .join(''); // Join the words without any separator
};

const GithubActivity = () => {
    const [githubData, setGithubData] = useState([]);
    const [noActivityToday, setNoActivityToday] = useState(false);

    useEffect(() => {
        const fetchGithubActivity = async () => {
            try {
                const response = await fetch('https://api.github.com/users/destucr/events');
                const data = await response.json();
                setGithubData(data);

                // Check if there is any activity today
                const hasActivityToday = data.some(event => isToday(new Date(event.created_at)));
                setNoActivityToday(!hasActivityToday);

            } catch (error) {
                console.error('Error fetching GitHub activity:', error);
            }
        };

        fetchGithubActivity();
    }, []);

    // Group events by repository and get the last two activities per repo
    const groupedRepos = () => {
        const grouped = {};

        // Group events by repo name
        githubData.forEach(event => {
            const repoName = event.repo.name.split('/')[1]; // Get repo name without username prefix
            if (!grouped[repoName]) {
                grouped[repoName] = [];
            }
            grouped[repoName].push(event);
        });

        // Sort events by creation date and limit to the latest two events per repo
        const sortedRepos = Object.keys(grouped)
            .map(repoName => ({
                repoName: toPascalCase(repoName), // Convert repo name to Pascal case for display
                originalRepoName: grouped[repoName][0].repo.name, // Keep original repo name for activity text
                events: grouped[repoName]
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by recent
                    .slice(0, 2) // Keep only the latest two events
            }))
            .sort((a, b) => new Date(b.events[0].created_at) - new Date(a.events[0].created_at)); // Sort repos by most recent event

        // Get top 3 most recent repos
        return sortedRepos.slice(0, 3);
    };

    return (
        <div className="space-y-4">
            {noActivityToday ? (
                <p className="text-center text-lg text-gray-500">No activity today</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedRepos().map((repo) => (
                        <div key={repo.repoName} className="bg-[var(--background)] p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-[var(--foreground)]">{repo.repoName}</h3>

                            {/* Display events */}
                            <div className="space-y-3 mt-3">
                                {repo.events.map((event) => (
                                    <a
                                        key={event.id}
                                        href={event.payload.url || `https://github.com/${event.repo.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 hover:bg-[var(--highlight)] transition-all rounded-md block"
                                        aria-label={`View activity on GitHub for ${repo.repoName}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            {/* Left side - Event Type */}
                                            <span className="text-sm text-[var(--secondary)]">{formatEventType(event.type)}</span>

                                            {/* Right side - Time Ago */}
                                            <span className="text-xs text-[var(--secondary)]">{formatDistanceToNow(new Date(event.created_at))} ago</span>
                                        </div>

                                        {/* Event Description */}
                                        <p className="text-[var(--foreground)] mt-1 text-sm">{`Activity in ${repo.originalRepoName}`}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GithubActivity;
