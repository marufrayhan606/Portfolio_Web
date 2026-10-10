import {
  siAndroid,
  siC,
  siCplusplus,
  siFastapi,
  siJetpackcompose,
  siKotlin,
  siMongodb,
  siMysql,
  siNumpy,
  siPandas,
  siPython,
  siPytorch,
  siScikitlearn,
  type SimpleIcon,
} from "simple-icons";

const marks: Record<string, SimpleIcon> = {
  android: siAndroid,
  c: siC,
  cplusplus: siCplusplus,
  fastapi: siFastapi,
  jetpackcompose: siJetpackcompose,
  kotlin: siKotlin,
  mongodb: siMongodb,
  mysql: siMysql,
  numpy: siNumpy,
  pandas: siPandas,
  python: siPython,
  pytorch: siPytorch,
  scikitlearn: siScikitlearn,
};

function getMark(name: string) {
  return marks[name.toLowerCase().replace(/[^a-z0-9]/g, "")];
}

export function TechMark({ name, compact = false }: { name: string; compact?: boolean }) {
  const mark = getMark(name);
  return <span className={`tech-mark${compact ? " tech-mark-compact" : ""}`}>
    {mark && <svg className="tech-mark-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={mark.path} fill={`#${mark.hex}`} /></svg>}
    <span>{name}</span>
  </span>;
}
