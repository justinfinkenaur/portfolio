/** @type {import('next').NextConfig} */
export default {
  async redirects() {
    return [
      // Original placeholder slugs. These are safe because the source and
      // destination share no case-insensitive overlap.
      { source: "/work/project-one",   destination: "/work/google-marketing-advisor", permanent: true },
      { source: "/work/project-two",   destination: "/work/amazon-echo-show-15-out-of-box-experience", permanent: true },
      { source: "/work/project-three", destination: "/work/amazon-buy-with-prime", permanent: true },
      { source: "/work/project-four",  destination: "/work/amazon-echo-show-picture-in-picture", permanent: true },
      { source: "/work/project-five",  destination: "/work/google-endpoint-management", permanent: true },
    ];
  },
};
