import * as icons from "components/icons";

function iconMapper(key) {
  // removes letter suffix
  const iconId = key?.slice(0, 2);

  const icon = Object.keys(icons).find((icon) => icon.includes(iconId));
  return icons[icon];
}

export default iconMapper;
