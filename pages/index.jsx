import React from 'react';

import Head from 'next/head';
import CreateAccount from '../components/CreateAccount';
import RestoreAccount from '../components/RestoreAccount';
import styled from 'styled-components';
import Link from 'next/link';
import Header from '../components/Header';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import headerBackground from '../public/headerBackground.png';

const Home = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <title>Wallet</title>
        <meta name="description" content="Solana crypto wallet." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <HomeTitle>
        <Box justifyContent={'center'} pt={12} flex={1}>
          <Heading
            size={{ base: '2xl', md: '2xl', lg: '2xl' }}
            sx={{
              fontWeight: '200',
              lineHeight: '67px',
            }}
            marginBottom={{ base: '26px', md: '26px', lg: '26px' }}
            as={motion.div}
            whileHover={{ scale: 1.1, rotate: 2 }}
          >
            The <Text as="b">ChainVault Wallet</Text> is here
          </Heading>
        </Box>
        A simple, Powerful and non-custodial crypto wallet for managing{' '}
        <Link passHref href="https://solana.com/">
          Solana
        </Link>{' '}
        digital assets.
      </HomeTitle>

      <HomeGrid>
        <CreateAccount />
        <RestoreAccount />
      </HomeGrid>
    </>
  );
};

const HomeTitle = styled.h1`
  padding: 0 3rem;
  margin: 3rem 1rem;
  line-height: 1.25;
  font-size: 1.5rem;
  font-weight: normal;
  text-align: center;

  & > a {
    color: #0070f3;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }
  }
`;

const HomeGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  width: 100%;
`;

export default Home;
