import * as React from "react";

const Search = ({ ...args }) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 24"
      {...args}
    >
      <path d="M15.594 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-4.23 6.5 6.5 0 1 0-6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5Zm-6 0c-2.49 0-4.5-2.01-4.5-4.5S7.104 5 9.594 5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5Z" />
    </svg>
  );
};

export default Search;
