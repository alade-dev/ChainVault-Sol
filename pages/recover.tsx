import * as Bip39 from "bip39";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Form, Input, Button } from "antd";
import { useGlobalState } from "../context";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Keypair } from "@solana/web3.js";

const Recover: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const { account, setAccount, setMnemonic } = useGlobalState();

  const handleImport = async (values: any) => {
    setLoading(true);
    const inputMnemonic = values.phrase.trim().toLowerCase();
    setMnemonic(inputMnemonic);

    const seed = Bip39.mnemonicToSeedSync(inputMnemonic);
    var seeds = Uint8Array.prototype.slice.call(seed, 0, 32);

    const importedAccount = Keypair.fromSeed(seeds);
    setAccount(importedAccount);
  };

  useEffect(() => {
    if (account) {
      router.push("/wallet");
    }
  }, [account, router]);

  return (
    <>
      <h1 className="mt-6 text-black font-bold text-4xl mb-3">Import Wallet</h1>

      <p className="font-md text-slate-300 mb-5 text-lg">
        Enter your secret recovery phrase here to restore your wallet.
      </p>

      <StyledForm
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        onFinish={handleImport}
      >
        <div style={{ overflow: 'hidden' }}>
          <Form.Item
            name="phrase"
            label="Secret Recovery Phrase"
            rules={[
              {
                required: true,
                message: 'Please enter your recovery phrase',
              },
              {
                validator(_, value) {
                  if (value.trim().split(' ').length === 12) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Recovery phrase must be 12 words long')
                  );
                },
              },
            ]}
          >
            <Input
              placeholder="Paste secret recovery phrase from clipboard"
              style={{ minWidth: '500px' }}
            />
          </Form.Item>
        </div>

        {!loading && (
          <Form.Item shouldUpdate className="submit">
            {() => (
              <Button
                className="shadow-md border rounded-md px-8  font-medium"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length > 0
                }
              >
                Import
              </Button>
            )}
          </Form.Item>
        )}

        {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
      </StyledForm>
    </>
  );
};

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Recover;
