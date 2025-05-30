
type ArrowProps =  {
  type: 'up' | 'down',
  fill: string
}

const ArrowIcon: React.FC<ArrowProps> = ({fill, type}) =>   {
 const transform = type === 'down' ?"rotate(180, 0, 0)" : 'rotate(0, 0, 0)'

  return (
    <svg
      fill={fill}
      viewBox="0 0 15 15"
      height="15px"
      width="15px"
      transform={transform}
    >
      <path
        fillRule="evenodd"
        d="M8 15a.5.5 0 00.5-.5V2.707l3.146 3.147a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 10.708.708L7.5 2.707V14.5a.5.5 0 00.5.5z"
      />
    </svg>
  );
}

export default ArrowIcon;
