import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old slug for the Flexible Data Tables case study
      { source: "/case-studies/configurable-data-table", destination: "/case-studies/Flexible-Data-Tables", permanent: true },
      { source: "/work/configurable-data-table", destination: "/work/Flexible-Data-Tables", permanent: true },
    ];
  },
};

export default nextConfig;
