import CategoriesPage from "@/Components/Template/CategoriesPage";

export default function Categories({ data }) {
  return <CategoriesPage data={data} />;
}

export async function getServerSideProps(context) {
  const {
    query: { difficulty = "Easy", time },
  } = context;
  const res = await fetch("http://localhost:4000/data");
  const data = await res.json();

  const filteredData = data.filter((item) => {
    //---------------------------------------------------------------------------
    const difficultyResult = item.details.filter(
      (detail) => detail.Difficulty && detail.Difficulty === difficulty,
    );
    //----------------------------------------------------------------------------
    // const timeResult = item.details.filter((detail) => {
    //   const cookingTime = detail["Cooking Time"] || "";
    //   // const timeDetail = cookingTime.split(" ")[0] ( Array Destructuring is more professional.)
    //   const [timeDetail] = cookingTime.split(" ");

    //   if (time === "less" && timeDetail && +timeDetail <= 30) {
    //     return detail;
    //   } else if (time === "more" && +timeDetail >= 30) {
    //     return detail;
    //   }
    // });

    const timeResult = item.details.filter((detail) => {
      const cookingTime = detail["Cooking Time"];

      if (!cookingTime) return false;

      const timeDetail = parseInt(cookingTime);

      if (time === "less") return timeDetail <= 30;
      if (time === "more") return timeDetail >= 30;

      return false;
    });

    //----------------------------------------------------------------------------

    if (time && difficulty && timeResult.length && difficultyResult.length) {
      return item;
    } else if (!time && difficulty && difficultyResult.length) {
      return item;
    } else if (time && !difficulty && timeResult.length) {
      return item;
    }
  });

  return {
    props: {
      data: filteredData,
    },
  };
}
