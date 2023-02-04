import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import headerBackground from '../public/headerBackground.png';
import React from 'react';

function Header() {
  return (
    <>
      <Box
        px={{ base: '20px', md: '20px', lg: '60px', xl: '60px' }}
        height={{
          base: '80%',
          md: '100%',
          lg: '100%',
          xl: '100%',
          '2xl': '100%',
        }}
        style={{
          backgroundImage: `url(${headerBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          marginTop: '-75px',
          marginBottom: '32px',
          paddingTop: '150px',
          zIndex: -1,
        }}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          direction={{
            base: 'column',
            md: 'column',
            lg: 'column',
            xl: 'column',
            '2xl': 'column',
          }}
          // flexWrap="nowrap"
          // as={motion.div}
        >
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
              The <Text as="b">Wallet</Text> is here
            </Heading>
            <Text
              fontSize={{ base: 'sm', md: 'sm', lg: 'sm' }}
              sx={{
                lineHeight: '25.89px',
              }}
              marginBottom={{ base: '48px', md: '48px', lg: '48px' }}
            >
              Discover how user can
            </Text>
            {/* <Flex
              flex-wrap="wrap"
              direction={{ base: 'column', md: 'row', lg: 'row', xl: 'row' }}
              justifyContent="flex-start"
              gap="20px"
            >
              {/* <Button
                color={'black'}
                bgColor="#805df2"
                _hover={{
                  background: 'white',
                  color: '#805df2',
                }}
                boxShadow="base"
                p="6"
                rounded="md"
                border={1}
              >
                Upload Book
              </Button> */}
            {/* </Flex> */}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Header;
