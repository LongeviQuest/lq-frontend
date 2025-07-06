export interface Links {
  title: string;
  url: string;
}

export interface FooterColumn {
  column: {
    heading: string;
    links: Links[];
  };
}

export const footerData: FooterColumn[] = [
  {
    column: {
      heading: 'Supercentenarians',
      links: [
        { title: 'Directory', url: 'https://longeviquest.com/atlas/world' },
        { title: 'Methodology', url: 'https://longeviquest.com/methodology/' },
        {
          title: 'Submit Claim',
          url: 'https://longeviquest.com/submit-claim/',
        },
        { title: 'News', url: 'https://longeviquest.com/news/' },
      ],
    },
  },
  {
    column: {
      heading: 'Our Company',
      links: [
        { title: 'About Us', url: 'https://longeviquest.com/about-us/' },
        { title: 'Advertising', url: 'https://advertising.longeviquest.com/' },
        { title: 'Terms of Service', url: 'https://longeviquest.com/terms-of-service' },
        { title: 'GDPR', url: 'https://longeviquest.com/privacy/' },
        { title: 'Support', url: 'mailto:support@longeviquest.com' },
      ],
    },
  },
];
