// Import any additional classes and/or functions needed from Solana's web3.js library as you go along:
import React, { useState, ReactElement } from 'react';
import { message } from 'antd';
import { useGlobalState } from '../../context';
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
const converter = require('number-to-words');
import { LoadingOutlined } from '@ant-design/icons';
import { refreshBalance } from '../../utils';
import {
  CheckContainer,
  CheckImage,
  CheckFrom,
  Processed,
  CheckDate,
  RecipientInput,
  AmountInput,
  SignatureInput,
  AmountText,
  RatioText,
} from '../../styles/StyledComponents.styles';

type FormT = {
  from: string;
  to: string;
  amount: number;
  isSigned: boolean;
};

const defaultForm: FormT = {
  from: '',
  to: '',
  amount: 0,
  isSigned: false,
};

const TransactionModal = (): ReactElement => {
  const { network, account, balance, setBalance } = useGlobalState();
  const [form, setForm] = useState<FormT>(defaultForm);
  const [sending, setSending] = useState<boolean>(false);
  const [transactionSig, setTransactionSig] = useState<string>('');

  const onFieldChange = (field: string, value: string) => {
    if (field === 'amount' && !!value.match(/\D+/)) {
      console.log(value);
      return;
    }

    setForm({
      ...form,
      [field]: value,
    });
  };

  const transfer = async () => {
    if (!account) return;

    try {
      console.log('Sign and Send not yet implemented!');
      const connection = new Connection(clusterApiUrl(network), 'confirmed');
      setTransactionSig('');

      const instructions = SystemProgram.transfer({
        fromPubkey: account.publicKey,
        toPubkey: new PublicKey(form.to),
        lamports: form.amount,
      });

      const transaction = new Transaction().add(instructions);
      const signers = [
        { publicKey: account.publicKey, secretKey: account.secretKey },
      ];

      setSending(true);

      const confirmation = await sendAndConfirmTransaction(
        connection,
        transaction,
        signers
      );
      setTransactionSig(confirmation);
      setSending(false);

      if (network) {
        const updatedBalance = await refreshBalance(network, account);
        setBalance(updatedBalance);
        message.success(`Transaction confirmed`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown Error';
      message.error(
        `Transaction failed, please check your inputs: ${errorMessage}`
      );
      setSending(false);
    }
  };

  return (
    <>
      <CheckContainer>
        <CheckImage
          width={'1035px'}
          height={'431px'}
          className="bg-[#d3d9de]"
        />
        <CheckFrom className="font-medium">{`FROM: ${account?.publicKey}`}</CheckFrom>

        {transactionSig && (
          <Processed
            href={`https://explorer.solana.com/tx/${transactionSig}?cluster=devnet`}
            target="_blank"
          >
            Processed - Review on Solana Block Explorer
          </Processed>
        )}

        <CheckDate>
          {`Date: ${new Date().toString().split(' ').slice(1, 4).join(' ')}`}
        </CheckDate>
        <p className="absolute top-28 font-medium text-base left-2">
          Receiver Address:
        </p>
        <RecipientInput
          value={form.to}
          onChange={(e) => onFieldChange('to', e.target.value)}
        />
        <p className="absolute top-20 font-medium text-base right-14">
          Amount to be sent:
        </p>
        <AmountInput
          value={form.amount}
          onChange={(e) => onFieldChange('amount', e.target.value)}
        />
        <AmountText className="font-semibold">
          {`Amount in Words: ${
            form.amount <= 0
              ? ''
              : converter.toWords(form.amount).charAt(0).toUpperCase() +
                converter.toWords(form.amount).slice(1)
          } $L`}
        </AmountText>
        {sending ? (
          <LoadingOutlined
            style={{
              fontSize: 24,
              position: 'absolute',
              top: '69%',
              left: '73%',
            }}
            spin
          />
        ) : (
          <SignatureInput
            onClick={transfer}
            disabled={
              !balance ||
              form.amount / LAMPORTS_PER_SOL > balance ||
              !form.to ||
              form.amount == 0
            }
            className="bg-gray-800 text-white shadow-md border rounded-md px-4 text-center align-middle py-6 font-medium"
          >
            Sign and Send
          </SignatureInput>
        )}
        <RatioText>1 $SOL = 1,000,000,000 $L</RatioText>
      </CheckContainer>
    </>
  );
};

export default TransactionModal;
