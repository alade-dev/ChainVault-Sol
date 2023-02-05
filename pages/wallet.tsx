import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Button, Drawer, Typography } from 'antd';
import { useGlobalState } from '../context';
import { useRouter } from 'next/router';
import TransactionLayout from '../components/TransactionLayout';
import { refreshBalance, handleAirdrop } from '../utils';
import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  Dashboard,
  Airdrop,
  Question,
} from '../styles/StyledComponents.styles';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Box, Tooltip } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';

const { Paragraph } = Typography;

const Wallet: NextPage = () => {
  const { network, account, balance, setBalance } = useGlobalState();
  const [visible, setVisible] = useState<boolean>(false);
  const [airdropLoading, setAirdropLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    if (!account) {
      router.push('/');
      return;
    }
    refreshBalance(network, account)
      .then((updatedBalance) => {
        setBalance(updatedBalance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [account, router, network, setBalance]);

  const airdrop = async () => {
    setAirdropLoading(true);
    const updatedBalance = await handleAirdrop(network, account);
    if (typeof updatedBalance === 'number') {
      setBalance(updatedBalance);
    }
    setAirdropLoading(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const displayAddress = (address: string) =>
    `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <>
      {account && (
        <Dashboard>
          <h1 className="mt-6 text-black font-bold text-4xl mb-3">Dashboard</h1>
          <Paragraph
            className=" text-white font-bold text-base mb-3"
            copyable={{ text: account.publicKey.toString(), tooltips: `Copy` }}
          >
            {`Account: ${displayAddress(account.publicKey.toString())}`}
          </Paragraph>
          <Tooltip
            hasArrow
            label="Click to add more token into your wallet"
            placement="right"
          >
            <PlusCircleIcon
              onClick={onOpen}
              className="absolute h-10 w-10 top-24 right-20 cursor-pointer text-gray-900 "
            />
          </Tooltip>
          <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Listed Token</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <h4>Coming Soon ...</h4>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-red-400 mr-3 shadow-sm rounded-md"
                  onClick={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <p className=" text-slate-300 font-bold text-lg mb-3">
            Connected to{' '}
            {network &&
              (network === 'mainnet-beta'
                ? network.charAt(0).toUpperCase() + network.slice(1, 7)
                : network.charAt(0).toUpperCase() + network.slice(1))}
          </p>
          {airdropLoading ? (
            <h2 className="text-white font-bold text-2xl mb-4">
              <LoadingOutlined spin />
            </h2>
          ) : (
            <h2 className="text-white font-bold text-2xl mb-4">
              {balance} <span>SOL</span>
            </h2>
          )}
          {network === 'devnet' && account && (
            <>
              <Airdrop
                className="shadow-md border rounded-md px-4 font-medium bg-white hover:bg-slate-100"
                onClick={airdrop}
              >
                Airdrop
              </Airdrop>
              <Tooltip
                hasArrow
                label="Click to receive 1 devnet SOL into your account"
                placement={'right'}
              >
                <Question>?</Question>
              </Tooltip>
            </>
          )}

          <Box>
            <Button className="absolute top-[240px] -right-[58px] bg-gray-800 h-12 font-medium text-white hover:bg-slate-300 hover:text-blue-600 translate-x-3 transition  ease-in  ">
              <Link passHref href='./collectibles'>NFT Collectibles</Link>
              <span aria-hidden="true">&rarr;</span>
            </Button>
          </Box>

          <Button
            className="bg-gray-800 text-white shadow-md border rounded-md px-4 font-medium"
            onClick={showModal}
          >
            Send <ArrowRightOutlined />
          </Button>
          <Drawer
            title="Send Funds"
            placement="bottom"
            onClose={handleClose}
            open={visible}
            height={'55vh'}
          >
            <TransactionLayout />
          </Drawer>
        </Dashboard>
      )}
    </>
  );
};

export default Wallet;
