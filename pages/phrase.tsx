import * as Bip39 from "bip39";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Button, Alert, Popconfirm } from "antd";
import PhraseBox from "../components/PhraseBox";
import { useGlobalState } from "../context";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Keypair } from "@solana/web3.js";

const Phrase: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const { setAccount, mnemonic, setMnemonic } = useGlobalState();

  const router = useRouter();

  useEffect(() => {
    const generatedMnemonic = Bip39.generateMnemonic();
    setMnemonic(generatedMnemonic);

    const seed = Bip39.mnemonicToSeedSync(generatedMnemonic);
    console.log(seed);
    var seeds = Uint8Array.prototype.slice.call(seed, 0, 32);
    console.log(seeds);

    const newAccount = Keypair.fromSeed(seeds);
    setAccount(newAccount);
  }, []);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    router.push("/wallet");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const warning =
    "Keep this phrase secret and safe. This is the only way for you to access your digital assets. Moreover, anyone can access your assets with it! Think of it as the password to your online bank account.";

  return (
    <>
      <h1 className="mt-6 text-black font-bold text-4xl mb-3">
        Secret Recovery Phrase
      </h1>

      <p className="text-black text-base font-medium">
        This recovery phrase is generated with your private keys and can be used
        to recover your account.
      </p>

      <Alert message={warning} type="warning" />

      <p className="text-black text-lg font-medium">
        Once you have stored this phrase somewhere safe, click finish to go to
        your wallet.
      </p>

      <PhraseBox mnemonic={mnemonic}></PhraseBox>

      {!loading && (
        <Popconfirm
          title="Did you copy the phrase?"
          visible={visible}
          onConfirm={handleOk}
          okButtonProps={{ loading: loading }}
          onCancel={handleCancel}
          cancelText={'No'}
          okText={'Yes'}
        >
          <Button
            className="bg-gray-900 text-white shadow-md border rounded-md px-12 text-center  font-medium"
            onClick={showPopconfirm}
          >
            Finish
          </Button>
        </Popconfirm>
      )}

      {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
    </>
  );
};

export default Phrase;
