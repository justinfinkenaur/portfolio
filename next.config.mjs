/** @type {import('next').NextConfig} */
export default {
  async redirects() {
    return [
      { source: "/work/project-one",   destination: "/work/Google-Marketing-Advisor", permanent: true },
      { source: "/work/project-two",   destination: "/work/Amazon-Echo-Show-15-Out-of-Box-Experience", permanent: true },
      { source: "/work/project-three", destination: "/work/Amazon-Buy-with-Prime", permanent: true },
      { source: "/work/project-four",  destination: "/work/Amazon-Echo-Show-Picture-In-Picture", permanent: true },
      { source: "/work/project-five",  destination: "/work/Google-Endpoint-Management", permanent: true },
    ];
  },
};
