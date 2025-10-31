import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './ToolLayout.scss';
import cx from 'classnames';
//import footerJsonData from '../../data/footer-data.json';
import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface FooterLink {
  title: string;
  url: string;
  target: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SiteSettings {
  header_logo?: {
    url: string;
  };
  footer_logo?: {
    url: string;
  };
  [key: `footer_column_${number}`]: {
    title: string;
    links: Array<{
      link: {
        title: string;
        url: string;
        target: string;
      } | string;
    }> | false;
  };
}
export const ToolLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [siteLogo, setSiteLogo] = useState<string | null>(null);
  const [footerLogo, setFooterLogo] = useState<string | null>(null);
  const [footerColumns, setFooterColumns] = useState<FooterColumn[]>([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch(
          'https://longeviquest.com/wp-json/atlas-settings/v1/data'
        );
        const data: any = await response.json();

        if (data.header_logo) setSiteLogo(data.header_logo.url);
        if (data.footer_logo) setFooterLogo(data.footer_logo.url);
        const columns = Object.keys(data)
          .filter(key => key.startsWith('footer_column'))
          .map(key => {
            const column = data[key];
            return {
              title: column.title || '',
              links: column.links && Array.isArray(column.links)
                ? column.links
                    .filter((linkItem: any) => 
                      linkItem.link && 
                      typeof linkItem.link !== 'string' &&
                      linkItem.link.title &&
                      linkItem.link.url
                    )
                    .map((linkItem: any) => ({
                      title: linkItem.link.title,
                      url: linkItem.link.url,
                      target: linkItem.link.target || '_self'
                    }))
              : []
            };
          });

        setFooterColumns(columns);
      } catch (error) {
        console.error('Error fetching site logos:', error);
      }
    };

    fetchLogos();
  }, []);

  const handleScrollNavigation = (link: string) => {
    const temp = link.split('#');

    navigate(temp[0]);
    setTimeout(() => {
      const targetElement = document.getElementById(temp[1]);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const renderItems = (
    items: {
      label: string;
      link: string;
    }[]
  ) => {
    let result = [];
    result = items.map((entry, index) => {
      if (entry.link.includes('#')) {
        return (
          <Text
            key={index}
            className="link"
            onClick={() => handleScrollNavigation(entry.link)}
          >
            {entry.label}
          </Text>
        );
      } else {
        return (
          <a key={index} className="link" href={entry.link}>
            {entry.label}
          </a>
        );
      }
    });
    return result;
  };

  const renderFooterLinks = (links: FooterLink[]) => {
    return links.map((link, index) => (
      <a 
        key={index} 
        className="link" 
        href={link.url}
        target={link.target}
        rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {link.title}
      </a>
    ));
  };

  return (
    <div className="lq_container">
      <header>
        <Flex
          direction={'column'}
          w={'100%'}
          align={'end'}
          justifyContent={'space-between'}
          wrap={'wrap'}
        >
          <div id="google_translate_element"></div>
          <Flex
            w={'100%'}
            align={'center'}
            justifyContent={'space-between'}
            wrap={'wrap'}
          >
            <a className="navbar-brand" href="/atlas/">
              <Image
                width={'auto'}
                height={'auto'}
                loading="lazy"
                src={siteLogo || "https://longeviquest.com/wp-content/uploads/2022/12/Horizontal_Fullcolor.svg?uyuy"}
                alt="LongeviQuest brand logo"
              />
              <span>|</span>
              <h2>Atlas</h2>
            </a>
            <div className="nav_links">
              <a key="atlas" href="/atlas/">
                Home
              </a>
              <a key="map" href="/atlas/world">
                World
              </a>
              <a key="living" href="/atlas/living">
                Living
              </a>
              <a key="women" href="/atlas/women">
                Women
              </a>
              <a key="men" href="/atlas/men">
                Men
              </a>
              <a key="deaths" href="/atlas/deaths">
                Recent Deaths
              </a>
              <a key="validations" href="/atlas/validations">
                Recent Validations
              </a>
              <a key="emigrant" href="/atlas/emigrant">
                Emigrants
              </a>
            </div>
          </Flex>
        </Flex>
      </header>
      <div
        className={cx('kernel', {
          fullWidth: location.pathname.includes('portal'),
        })}
      >
        {/* <iframe
          style={{ margin: '0 auto' }}
          src="https://www.lduhtrp.net/widgetcode-65754722ace159f5090b2a02-101009766?mouseover=Y&target=_top"
          width="680"
          height="250"
          frameBorder={0}
          marginWidth={0}
          marginHeight={0}
          scrolling="no"
        ></iframe> */}
        <Outlet />
      </div>
      <footer className="footer">
        <div className="footer-container">
          <div className="logo-container">
            <Image
              width={'auto'}
              height={'auto'}
              loading="lazy"
              src={footerLogo || "https://longeviquest.com/wp-content/uploads/2024/01/longeviquest-logo-600-white-text.png"}
              alt="LongeviQuest"
            ></Image>
          </div>
          <div className="row">
            {footerColumns.map((column: FooterColumn, footerIndex) => (
              <div key={footerIndex} className="column">
                <div className="heading">{column.title}</div>
                {renderFooterLinks(column.links)}
              </div>
            ))}
          </div>
          <div className="h-divider"></div>
          <div className="copyright">
            © 2025 LongeviQuest. All Rights Reserved.
            <div className="privacy">
              <a className="link" href={'https://longeviquest.com/privacy/'}>
                Privacy Policy
              </a>
              <div className="v-divider">|</div>
              <a
                className="link"
                href={'https://longeviquest.com/terms-of-service/'}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
