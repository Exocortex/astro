import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  .tk-icon {
    fill: black;
  }
`;

export const CartOutlined = () => {
  return (
    <SVG
      width="19"
      height="16"
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="tk-icon fill"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 1C0.5 0.447715 0.947715 0 1.5 0H4.22076L4.88743 2H18.419L15.2047 11H7.22076L6.88743 12H14.5C15.0523 12 15.5 12.4477 15.5 13C15.5 13.0283 15.4988 13.0564 15.4965 13.0841C16.0809 13.2891 16.5 13.8456 16.5 14.5C16.5 15.3284 15.8284 16 15 16C14.1716 16 13.5 15.3284 13.5 14.5C13.5 14.3247 13.5301 14.1564 13.5854 14H6.41465C6.46992 14.1564 6.5 14.3247 6.5 14.5C6.5 15.3284 5.82843 16 5 16C4.17157 16 3.5 15.3284 3.5 14.5C3.5 13.883 3.87257 13.3529 4.40503 13.1226L5.44591 10L2.77924 2H1.5C0.947715 2 0.5 1.55228 0.5 1ZM4.5 14.5C4.5 14.2239 4.72386 14 5 14C5.27614 14 5.5 14.2239 5.5 14.5C5.5 14.7761 5.27614 15 5 15C4.72386 15 4.5 14.7761 4.5 14.5ZM7.22076 9H13.7953L15.581 4H5.55409L7.22076 9ZM14.5 14.5C14.5 14.2239 14.7239 14 15 14C15.2761 14 15.5 14.2239 15.5 14.5C15.5 14.7761 15.2761 15 15 15C14.7239 15 14.5 14.7761 14.5 14.5Z"
      />
    </SVG>
  );
};

export default CartOutlined;
