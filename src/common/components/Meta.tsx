// src/common/components/Meta.tsx
interface MetaProps {
  title?: string;
  description?: string;
  noIndex?: boolean;
}

const APP_NAME = "ApexGuessr";
const DEFAULT_DESCRIPTION =
  "Test your knowledge of motorsport circuits from around the world. Identify the track and pinpoint its location on the map in this GeoGuessr-inspired game.";

export const Meta: React.FC<MetaProps> = ({
  title,
  description,
  noIndex = false,
}) => {
  const pageTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  const pageDescription = description || DEFAULT_DESCRIPTION;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </>
  );
};
