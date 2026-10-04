import Attribute from "../modules/Attribute";
import Banner from "../modules/Banner";
import Companies from "../modules/Companies";
import Definition from "../modules/Definition";
import Guide from "../modules/Guide";
import Instruction from "../modules/Instruction";
import Restrictions from "../modules/Restrictions";
import styles from "./HomePage.module.css";
function HomePage() {
  return (
    <div className={styles.container}>
      <Banner />
      <Attribute />
      <Definition />
      <Companies />
      <Instruction />
      <Guide />
      <Restrictions />
    </div>
  );
}

export default HomePage;
