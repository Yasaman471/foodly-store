import { useState } from "react";
import styles from "./CategoriesPage.module.css";
import { useRouter } from "next/router";
import Card from "../modules/Card";

function CategoriesPage({ data }) {
  const router = useRouter();

  const [query, setQuery] = useState({
    difficulty: router.query.difficulty || "Easy",
    time: router.query.time || "",
  });

  const ChangeHandler = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const searchHandler = () => {
    router.push({ pathname: "/categories", query });
  };
  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <div className={styles.select}>
        <select
          value={query.difficulty}
          name="difficulty"
          onChange={ChangeHandler}
        >
          <option value="">Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select value={query.time} name="time" onChange={ChangeHandler}>
          <option value="">Cooking Time</option>
          <option value="more">More than 30 min</option>
          <option value="less">Less than 30 min</option>
        </select>
        <button onClick={searchHandler}>Search</button>
      </div>
      <div className={styles.cards}>
        {!data.length ? <img src="/images/search.png" alt="category" /> : null}
        {data.map((food) => (
          <Card key={food.id} {...food} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
