import { ReactComponent as SVGIcon } from '../../assets/svg/loading.svg';

const DEFAULT_WIDTH = 24;
const DEFAULT_HEIGHT = 24;

type Props = {
  width?: number | string;
  height?: number | string;
};

function LoadingIndicator({ width, height }: Props) {
  return (
    <SVGIcon width={width || DEFAULT_WIDTH} height={height || DEFAULT_HEIGHT} />
  );
}

export default LoadingIndicator;
