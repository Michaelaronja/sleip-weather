import * as React from "react";

const Loader = ({ ...args }) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      {...args}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.079 37.279A19.907 19.907 0 0 1 20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20c0 .48-.017.955-.05 1.426l-5.132.92c.12-.765.182-1.548.182-2.346 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15 3.43 0 6.59-1.151 9.118-3.088l.96 5.367Z"
      />
    </svg>
  );
};

export default Loader;
