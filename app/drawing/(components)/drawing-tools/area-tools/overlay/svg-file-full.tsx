import { DrawSvgFull } from "@/utils/interface";
import { MutableRefObject } from "react";

interface SvgComponentsProps {
  drawSvgFull: DrawSvgFull | any;
  strokeRectRef: MutableRefObject<SVGRectElement | null> | null;
  strokePathRef: MutableRefObject<SVGPathElement | null> | null;
  strokeRectBgRef: MutableRefObject<SVGRectElement | null> | null;
}

const SvgFullComponents: React.FC<SvgComponentsProps> = (props) => {
  if (props.drawSvgFull.svg === "triangle-full")
    return (
      <>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24.00 24.00"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: props.drawSvgFull.opacity
          }}
        >
          <defs>
            <clipPath id="clipTriangle">
              <path d="M4.2433 17.6513L10.5859 5.67095C11.0445 4.80456 11.2739 4.37136 11.5798 4.22973C11.8463 4.10637 12.1535 4.10637 12.42 4.22973C12.726 4.37136 12.9553 4.80456 13.414 5.67094L19.7565 17.6513C20.1668 18.4263 20.372 18.8138 20.3305 19.13C20.2943 19.4059 20.1448 19.6543 19.9179 19.8154C19.6579 19.9999 19.2194 19.9999 18.3425 19.9999H5.65737C4.78044 19.9999 4.34198 19.9999 4.08198 19.8154C3.85505 19.6543 3.70551 19.4059 3.66932 19.13C3.62785 18.8138 3.833 18.4263 4.2433 17.6513Z" />
            </clipPath>
          </defs>

          <rect
            ref={props.strokeRectBgRef}
            x="0"
            y="0"
            width="24"
            height="24"
            fill={props.drawSvgFull.color}
            clipPath="url(#clipTriangle)"
            style={{
              fill: props.drawSvgFull.color,
            }}
          />

          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              ref={props.strokePathRef}
              d="M4.2433 17.6513L10.5859 5.67095C11.0445 4.80456 11.2739 4.37136 11.5798 4.22973C11.8463 4.10637 12.1535 4.10637 12.42 4.22973C12.726 4.37136 12.9553 4.80456 13.414 5.67094L19.7565 17.6513C20.1668 18.4263 20.372 18.8138 20.3305 19.13C20.2943 19.4059 20.1448 19.6543 19.9179 19.8154C19.6579 19.9999 19.2194 19.9999 18.3425 19.9999H5.65737C4.78044 19.9999 4.34198 19.9999 4.08198 19.8154C3.85505 19.6543 3.70551 19.4059 3.66932 19.13C3.62785 18.8138 3.833 18.4263 4.2433 17.6513Z"
              stroke={props.drawSvgFull.borderColor}
              strokeWidth={props.drawSvgFull.thickness}
              style={{
                stroke: props.drawSvgFull.borderColor,
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </>
    );
  if (props.drawSvgFull.svg === "square-full")
    return (
      <>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24.00 24.00"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: props.drawSvgFull.opacity
          }}
        >
          <defs>
            <clipPath id="clipSquare">
              <rect x="4" y="4" width="16" height="16" rx="2"></rect>
            </clipPath>
          </defs>
          <rect
            ref={props.strokeRectBgRef}
            x="0"
            y="0"
            width="24"
            height="24"
            fill={props.drawSvgFull.color}
            clipPath="url(#clipSquare)"
            style={{
              fill: props.drawSvgFull.color,
            }}
          />
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <rect
              ref={props.strokeRectRef}
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
              stroke={props.drawSvgFull.borderColor}
              strokeWidth={props.drawSvgFull.thickness}
              style={{
                stroke: props.drawSvgFull.borderColor,
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
            ></rect>{" "}
          </g>
        </svg>
      </>
    );
  if (props.drawSvgFull.svg === "circle-full")
    return (
      <>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: props.drawSvgFull.opacity
          }}
        >
          <defs>
            <clipPath id="clipCircle">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
            </clipPath>
          </defs>
          <rect
            ref={props.strokeRectBgRef}
            x="0"
            y="0"
            width="24"
            height="24"
            fill={props.drawSvgFull.color}
            clipPath="url(#clipCircle)"
            style={{
              fill: props.drawSvgFull.color,
            }}
          />
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              ref={props.strokePathRef}
              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke={props.drawSvgFull.borderColor}
              strokeWidth={props.drawSvgFull.thickness}
              style={{
                stroke: props.drawSvgFull.borderColor,
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </>
    );

  if (props.drawSvgFull.svg === "ticket-full")
    return (
      <>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24.00 24.00"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: props.drawSvgFull.opacity
          }}
        >
          <defs>
            <clipPath id="clipTicket">
              <path d="M5 12.0002C5 10.694 4.16519 9.58273 3 9.1709V7.6C3 7.03995 3 6.75992 3.10899 6.54601C3.20487 6.35785 3.35785 6.20487 3.54601 6.10899C3.75992 6 4.03995 6 4.6 6H19.4C19.9601 6 20.2401 6 20.454 6.10899C20.6422 6.20487 20.7951 6.35785 20.891 6.54601C21 6.75992 21 7.03995 21 7.6V9.17071C19.8348 9.58254 19 10.694 19 12.0002C19 13.3064 19.8348 14.4175 21 14.8293V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H4.6C4.03995 18 3.75992 18 3.54601 17.891C3.35785 17.7951 3.20487 17.6422 3.10899 17.454C3 17.2401 3 16.9601 3 16.4V14.8295C4.16519 14.4177 5 13.3064 5 12.0002Z" />
            </clipPath>
          </defs>
          <rect
            ref={props.strokeRectBgRef}
            x="0"
            y="0"
            width="24"
            height="24"
            fill={props.drawSvgFull.color}
            clipPath="url(#clipTicket)"
            style={{
              fill: props.drawSvgFull.color,
            }}
          />
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              ref={props.strokePathRef}
              d="M5 12.0002C5 10.694 4.16519 9.58273 3 9.1709V7.6C3 7.03995 3 6.75992 3.10899 6.54601C3.20487 6.35785 3.35785 6.20487 3.54601 6.10899C3.75992 6 4.03995 6 4.6 6H19.4C19.9601 6 20.2401 6 20.454 6.10899C20.6422 6.20487 20.7951 6.35785 20.891 6.54601C21 6.75992 21 7.03995 21 7.6V9.17071C19.8348 9.58254 19 10.694 19 12.0002C19 13.3064 19.8348 14.4175 21 14.8293V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H4.6C4.03995 18 3.75992 18 3.54601 17.891C3.35785 17.7951 3.20487 17.6422 3.10899 17.454C3 17.2401 3 16.9601 3 16.4V14.8295C4.16519 14.4177 5 13.3064 5 12.0002Z"
              stroke={props.drawSvgFull.borderColor}
              strokeWidth={props.drawSvgFull.thickness}
              style={{
                stroke: props.drawSvgFull.borderColor,
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </>
    );
  if (props.drawSvgFull.svg === "cloud-full")
    return (
      <>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: props.drawSvgFull.opacity
          }}
        >
          <defs>
            <clipPath id="clipCloud">
              <path d="M3 13.6493C3 16.6044 5.41766 19 8.4 19L16.5 19C18.9853 19 21 16.9839 21 14.4969C21 12.6503 19.8893 10.9449 18.3 10.25C18.1317 7.32251 15.684 5 12.6893 5C10.3514 5 8.34694 6.48637 7.5 8.5C4.8 8.9375 3 11.2001 3 13.6493Z" />
            </clipPath>
          </defs>
          <rect
            ref={props.strokeRectBgRef}
            x="0"
            y="0"
            width="24"
            height="24"
            fill={props.drawSvgFull.color}
            clipPath="url(#clipCloud)"
            style={{
              fill: props.drawSvgFull.color,
            }}
          />
          <path
            ref={props.strokePathRef}
            d="M3 13.6493C3 16.6044 5.41766 19 8.4 19L16.5 19C18.9853 19 21 16.9839 21 14.4969C21 12.6503 19.8893 10.9449 18.3 10.25C18.1317 7.32251 15.684 5 12.6893 5C10.3514 5 8.34694 6.48637 7.5 8.5C4.8 8.9375 3 11.2001 3 13.6493Z"
            stroke={props.drawSvgFull.borderColor}
            strokeWidth={props.drawSvgFull.thickness}
            style={{
              stroke: props.drawSvgFull.borderColor,
            }}
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </>
    );
  if (props.drawSvgFull.svg === "droplet-full")
    return (
      <>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24.00 24.00"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: props.drawSvgFull.opacity
          }}
        >
          <defs>
            <clipPath id="clipDroplet">
              <path d="M19 13.8C19 17.7764 15.866 21 12 21C8.13401 21 5 17.7764 5 13.8C5 12.8452 5.18069 11.9338 5.50883 11.1C6.54726 8.46135 12 3 12 3C12 3 17.4527 8.46135 18.4912 11.1C18.8193 11.9338 19 12.8452 19 13.8Z" />
            </clipPath>
          </defs>
          <rect
            ref={props.strokeRectBgRef}
            x="0"
            y="0"
            width="24"
            height="24"
            fill={props.drawSvgFull.color}
            clipPath="url(#clipDroplet)"
            style={{
              fill: props.drawSvgFull.color,
            }}
          />
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#CCCCCC"
            strokeWidth="0.24000000000000005"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              ref={props.strokePathRef}
              d="M19 13.8C19 17.7764 15.866 21 12 21C8.13401 21 5 17.7764 5 13.8C5 12.8452 5.18069 11.9338 5.50883 11.1C6.54726 8.46135 12 3 12 3C12 3 17.4527 8.46135 18.4912 11.1C18.8193 11.9338 19 12.8452 19 13.8Z"
              stroke={props.drawSvgFull.borderColor}
              strokeWidth={props.drawSvgFull.thickness}
              style={{
                stroke: props.drawSvgFull.borderColor,
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </>
    );

  if (props.drawSvgFull.svg === "star-full")
    return (
      <>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24.00 24.00"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: props.drawSvgFull.opacity
          }}
        >
          <defs>
            <clipPath id="clipStar">
              <path d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z" />
            </clipPath>
          </defs>
          <rect
            ref={props.strokeRectBgRef}
            x="0"
            y="0"
            width="24"
            height="24"
            fill={props.drawSvgFull.color}
            clipPath="url(#clipStar)"
            style={{
              fill: props.drawSvgFull.color,
            }}
          />
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              ref={props.strokePathRef}
              d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z"
              stroke={props.drawSvgFull.borderColor}
              strokeWidth={props.drawSvgFull.thickness}
              style={{
                stroke: props.drawSvgFull.borderColor,
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </>
    );

  if (props.drawSvgFull.svg === "heart-full")
    return (
      <>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24.00 24.00"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: props.drawSvgFull.opacity
          }}
        >
          <defs>
            <clipPath id="clipHeart">
              <path d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" />
            </clipPath>
          </defs>
          <rect
            ref={props.strokeRectBgRef}
            x="0"
            y="0"
            width="24"
            height="24"
            fill={props.drawSvgFull.color}
            clipPath="url(#clipHeart)"
            style={{
              fill: props.drawSvgFull.color,
            }}
          />
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              ref={props.strokePathRef}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke={props.drawSvgFull.borderColor}
              strokeWidth={props.drawSvgFull.thickness}
              style={{
                stroke: props.drawSvgFull.borderColor,
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </>
    );

  if (props.drawSvgFull.svg === "hexagon-full")
    return (
      <>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24.00 24.00"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: props.drawSvgFull.opacity
          }}
        >
          <defs>
            <clipPath id="clipHexagon">
              <path d="M12.8001 21.5382C12.5087 21.7065 12.3629 21.7906 12.208 21.8235C12.0709 21.8527 11.9293 21.8527 11.7922 21.8235C11.6373 21.7906 11.4915 21.7065 11.2001 21.5382L4.13984 17.462C3.8484 17.2937 3.70268 17.2096 3.5967 17.0919C3.50293 16.9877 3.43209 16.865 3.38879 16.7318C3.33984 16.5811 3.33984 16.4129 3.33984 16.0763V7.92385C3.33984 7.58732 3.33984 7.41905 3.38879 7.26842C3.43209 7.13514 3.50293 7.01245 3.5967 6.9083C3.70268 6.7906 3.8484 6.70647 4.13984 6.5382L11.2001 2.46196C11.4915 2.2937 11.6373 2.20957 11.7922 2.17664C11.9293 2.1475 12.0709 2.1475 12.208 2.17664C12.3629 2.20957 12.5087 2.2937 12.8001 2.46196L19.8604 6.5382C20.1518 6.70647 20.2975 6.7906 20.4035 6.9083C20.4973 7.01245 20.5681 7.13514 20.6114 7.26842C20.6604 7.41905 20.6604 7.58732 20.6604 7.92384V16.0763C20.6604 16.4129 20.6604 16.5811 20.6114 16.7318C20.5681 16.865 20.4973 16.9877 20.4035 17.0919C20.2975 17.2096 20.1518 17.2937 19.8604 17.462L12.8001 21.5382Z" />
            </clipPath>
          </defs>
          <rect
            ref={props.strokeRectBgRef}
            x="0"
            y="0"
            width="24"
            height="24"
            fill={props.drawSvgFull.color}
            clipPath="url(#clipHexagon)"
            style={{
              fill: props.drawSvgFull.color,
            }}
          />
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              ref={props.strokePathRef}
              d="M12.8001 21.5382C12.5087 21.7065 12.3629 21.7906 12.208 21.8235C12.0709 21.8527 11.9293 21.8527 11.7922 21.8235C11.6373 21.7906 11.4915 21.7065 11.2001 21.5382L4.13984 17.462C3.8484 17.2937 3.70268 17.2096 3.5967 17.0919C3.50293 16.9877 3.43209 16.865 3.38879 16.7318C3.33984 16.5811 3.33984 16.4129 3.33984 16.0763V7.92385C3.33984 7.58732 3.33984 7.41905 3.38879 7.26842C3.43209 7.13514 3.50293 7.01245 3.5967 6.9083C3.70268 6.7906 3.8484 6.70647 4.13984 6.5382L11.2001 2.46196C11.4915 2.2937 11.6373 2.20957 11.7922 2.17664C11.9293 2.1475 12.0709 2.1475 12.208 2.17664C12.3629 2.20957 12.5087 2.2937 12.8001 2.46196L19.8604 6.5382C20.1518 6.70647 20.2975 6.7906 20.4035 6.9083C20.4973 7.01245 20.5681 7.13514 20.6114 7.26842C20.6604 7.41905 20.6604 7.58732 20.6604 7.92384V16.0763C20.6604 16.4129 20.6604 16.5811 20.6114 16.7318C20.5681 16.865 20.4973 16.9877 20.4035 17.0919C20.2975 17.2096 20.1518 17.2937 19.8604 17.462L12.8001 21.5382Z"
              stroke={props.drawSvgFull.borderColor}
              strokeWidth={props.drawSvgFull.thickness}
              style={{
                stroke: props.drawSvgFull.borderColor,
              }}
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </>
    );
};

export default SvgFullComponents;
