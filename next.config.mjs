/** @type {import('next').NextConfig} */
export default {
  async redirects() {
    return [
      // Original placeholder slugs
      { source: "/work/project-one",   destination: "/work/google-marketing-advisor", permanent: true },
      { source: "/work/project-two",   destination: "/work/amazon-echo-show-15-out-of-box-experience", permanent: true },
      { source: "/work/project-three", destination: "/work/amazon-buy-with-prime", permanent: true },
      { source: "/work/project-four",  destination: "/work/amazon-echo-show-picture-in-picture", permanent: true },
      { source: "/work/project-five",  destination: "/work/google-endpoint-management", permanent: true },

      // Title-case slugs
      { source: "/work/Google-Marketing-Advisor", destination: "/work/google-marketing-advisor", permanent: true },
      { source: "/work/Amazon-Echo-Show-15-Out-of-Box-Experience", destination: "/work/amazon-echo-show-15-out-of-box-experience", permanent: true },
      { source: "/work/Google-Endpoint-Management", destination: "/work/google-endpoint-management", permanent: true },
      { source: "/work/Amazon-Echo-Show-Picture-In-Picture", destination: "/work/amazon-echo-show-picture-in-picture", permanent: true },
      { source: "/work/Amazon-Buy-with-Prime", destination: "/work/amazon-buy-with-prime", permanent: true },
    ];
  },
};
