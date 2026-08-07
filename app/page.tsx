import NewsFeed from "@/components/common/NewsFeed";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import TrendingTools from "@/components/home/TrendingTools";
import LivePrices from "@/components/home/LivePrices";
import StatsBanner from "@/components/home/StatsBanner";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <div id="news"><NewsFeed /></div>
      <Hero />
      <Categories />
      <TrendingTools />
      <LivePrices />
      <StatsBanner />
      <Testimonials />
      <Newsletter />
    </>
  );
}
