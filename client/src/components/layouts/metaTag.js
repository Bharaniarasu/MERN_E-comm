import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTag = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - TNcart`}</title>
    </Helmet>
  );
};

export default MetaTag;
