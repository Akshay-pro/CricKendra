// pages/articles/index.js
"use client";
import Image from 'next/image';
import React from 'react';

const articles = [
  {
    image: 'https://media.gettyimages.com/id/1802479186/photo/final-icc-mens-cricket-world-cup-india-2023.jpg?s=1024x1024&w=gi&k=20&c=uTIWdLdtyK_a4x9ut_hniz37YHPc6o8-kjdUf6Cdbnw=',
    title: 'India vs Australia: Match Recap',
    description: 'India clinched a thrilling victory over Australia in the final over. Rohit Sharma and Bumrah shined throughout the innings.',
  },
  {
    image: 'https://media.gettyimages.com/id/1472909629/photo/india-v-australia-4th-test-day-4.jpg?s=1024x1024&w=gi&k=20&c=mbEk1emxk-G9xYB-t_-kVHZZRDnKWQxfka5PNTA4c0Q=',
    title: 'Kohli Scores Another Century',
    description: 'Virat Kohli once again proved why he is one of the greats with a classy hundred against South Africa.',
  },
  {
    image: 'https://media.gettyimages.com/id/1790874492/photo/topshot-cricket-icc-mens-wc-2023-ind-aus-odi.jpg?s=1024x1024&w=gi&k=20&c=NuPgGDzJqPLryWvtFmsmiTqDaTevR1JDWoJx0B1Dsig=',
    title: 'World Cup 2023: Full Review',
    description: 'The 2023 World Cup brought surprises and emotions. We review the best matches, top performers, and heartbreak moments.',
  },
  {
    image: 'https://media.gettyimages.com/id/910878118/photo/india-cricket-t20-ipl-auction.jpg?s=1024x1024&w=gi&k=20&c=TVN9blCJRSLlOu9nY2i6Md9oYKAxmzGc4ICp1h3XyqU=',
    title: 'IPL 2025 Auction: Top Buys',
    description: 'The IPL 2025 auction saw some big buys and shocking omissions. Let’s break down each team’s strategy.',
  },
  {
    image: 'https://media.gettyimages.com/id/1408242525/photo/england-v-india-1st-royal-london-series-one-day-international.jpg?s=1024x1024&w=gi&k=20&c=0_h6gtrkjvYQQeNWHSB8XWXzN_5yL_fEtnAl9kpPj9Q=',
    title: 'Jasprit Bumrah: Bowling Masterclass',
    description: 'Bumrah’s spell of 5/18 dismantled England’s batting line-up and showed why he’s the best death bowler in the world.',
  },
];

const ArticlesPage = () => {
  return (
    <div className="w-full py-4">
      <h1 className="text-2xl font-bold mb-8">Cricket Articles</h1>
      {articles.map((article, index) => (
        <div key={index} className="flex bg-white shadow-md rounded-lg overflow-hidden mb-6 items-center">
          <Image width={200} height={200} src={article.image} alt={article.title} className="w-[200px] h-[100px] object-cover" />
          <div className="p-4 w-2/3">
            <h2 className="text-lg font-bold text-gray-800 mb-2">{article.title}</h2>
            <p className="text-gray-600">{article.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticlesPage;