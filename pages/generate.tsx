import React, { useState } from "react";
import { NextPage } from "next";
import { Button } from "antd";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

const Phrase: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoading = () => {
    setLoading(true)
  };

  return (
    <>
      <h1 className="mt-6 text-black font-bold text-4xl mb-3">Create New Wallet</h1>

      <p className="font-md text-white text-lg">Generate a key phrase to set up your Solana wallet.</p>

      {!loading && (
        <Link href="/phrase" passHref>
          <Button
            className="mt-8 shadow-md border rounded-md px-4 font-medium"
            onClick={handleLoading}
          >
            Generate
          </Button>
        </Link>
      )}

      {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
    </>
  );
};

export default Phrase;
