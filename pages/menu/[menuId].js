import DetailsPage from "@/Components/Template/DetailsPage";
import { useRouter } from "next/router";

export default function FoodDetails({ data }) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;
  return <DetailsPage {...data} />;
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:4000/data");
  const items = await res.json();
  const data = items.slice(0, 10);

  const paths = data.map((food) => ({
    params: { menuId: food.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { menuId } = context.params;

  const res = await fetch(`http://localhost:4000/data/${menuId}`);
  const data = await res.json();

  if (!data.id) return { notFound: true };

  return {
    props: { data },
    revalidate: 10,
  };
}
