import { Project } from "../types";
import castellanstore from "./studycases/castellanstore/castellanstore.json";
import sincro from "./studycases/sincro/sincro.json";
import omnistock from "./studycases/omnistock/omnistock.json";
import animalwatch from "./studycases/animalwatch/animalwatch.json";

const projects: Project[] = [
  castellanstore as Project,
  sincro as Project,
  omnistock as Project,
  animalwatch as Project,
];

export default projects;
