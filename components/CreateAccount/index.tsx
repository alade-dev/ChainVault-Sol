import React, { useState, useEffect, ReactElement } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { BankOutlined, LoadingOutlined } from '@ant-design/icons';
import { Card } from '../../styles/StyledComponents.styles';

const CreateAccount = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleGenerate = () => {
    setLoading(true);
  };

  return (
    <Card>
      <BankOutlined
        style={{ fontSize: '3rem', margin: '2rem 0', display: 'block' }}
      />
      <h2>New to ChainVault?</h2>
      <p>
        Create a new wallet to send, receive and swap Solana digital assets.
      </p>

      <div className={'buttons'}>
        {!loading && (
          <Link href="/generate" passHref>
            <Button
              className="bg-gray-900 text-white hover:border-none translate-y-3 transition ease-out hover:text-[#2883b1] shadow-md border rounded-md px-4 font-medium "
              onClick={handleGenerate}
            >
              Create New Wallet
            </Button>
          </Link>
        )}
        {loading && (
          <Button className={'disabledButton'} disabled>
            <LoadingOutlined spin />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CreateAccount;
