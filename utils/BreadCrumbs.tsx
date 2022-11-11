import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
}
function BreadCrumbs({ title }: Props) {
  return (
    <div>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="none" color="inherit" href="/product-listings">
            Home
          </Link>

          <Typography color="text.primary">{title}</Typography>
        </Breadcrumbs>
      </div>
    </div>
  );
}

export default BreadCrumbs;
