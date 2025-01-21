// pages/index.js
import React, { Suspense } from 'react'; // 确保导入 React
import { getSortedPostsData } from '@/lib/posts'
import { getCategories } from '@/lib/data';

import { ToolsList } from '@/components/ToolsList';
import { ArticleList } from '@/components/ArticleList'

import { Search } from '@/components/Search';
import {getTranslations, getLocale} from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}


type categoryType = { 
  name: string; 
  src: string; 
  description: string;
  link: string; 
}


export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations('home');
  const categories = getCategories(locale);
  const allPostsData = getSortedPostsData(locale).slice(0, 6)
  
  return (
    <div className="container mx-auto py-12 space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold lg:text-7xl tracking-tighter">
          {t("h1")}
        </h1>
        <h2 className="text-2xl tracking-tight sm:text-3xl md:text-3xl lg:text-3xl">{t("h2")}</h2>
        <p className="mx-auto max-w-[700px] md:text-xl tracking-tight">
          {t("intro")}
        </p>
        <div className='w-full px-2 pt-10 lg:w-1/2'>
          <Search />
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">{t("features.title")}</h2>
        <ul className="space-y-4">
          <li>{t("features.weapons")}</li>
          <li>{t("features.combat")}</li>
          <li>{t("features.hema")}</li>
        </ul>
      </section>

      {/* Gameplay Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">{t("gameplay.title")}</h2>
        <p>{t("gameplay.description")}</p>
      </section>

      {/* Tips Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">{t("tips.title")}</h2>
        <ul className="space-y-4">
          <li>{t("tips.weapon")}</li>
          <li>{t("tips.armor")}</li>
          <li>{t("tips.strategy")}</li>
        </ul>
      </section>

      {/* News Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">{t("news.title")}</h2>
        <p>{t("news.demo")}</p>
      </section>

      {/* Community Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">{t("community.title")}</h2>
        <p>{t("community.description")}</p>
        <p>{t("community.conclusion")}</p>
      </section>

      <div className='border-t'></div>
      
      {/* 保留原有的 ToolsList */}
      {categories.map((category: categoryType, index: React.Key | null | undefined) => (
        <ToolsList key={index} category={category} locale={locale} />
      ))}
      
      <div className='border-t'></div>
      
      {/* 保留原有的 ArticleList */}
      <Suspense fallback={<div>Loading editor...</div>}>
        <ArticleList articles={allPostsData} />
      </Suspense>
    </div>
  )
}