import { Td } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import ModalForm from './modal';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useToast } from '@chakra-ui/react';
import usePoolAave from '@/hooks/usePoolAave';

const Withdraw = ({ address }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const pool = usePoolAave();
  const { active, account } = useWeb3React();
  const toast = useToast();

  const handleWithdraw = async (monto) => {
    if (active) {
      const result = await pool.methods
        .withdraw(address, monto, account)
        .send({ from: account })
        .on('transactionHash', (txHash) => {
          toast({
            title: 'Transacción enviada',
            description: txHash,
            status: 'info',
          });
        })
        .on('receipt', () => {
          toast({
            title: 'Transacción enviada',
            description: monto,
            status: 'info',
          });
        })
        .on('error', (error) => {
          toast({
            title: 'Transacción fallida',
            description: error.message,
            status: 'error',
          });
        });
    }
  };

  return (
    <Td isNumeric>
      <Button colorScheme="blue" variant="outline" onClick={onOpen}>
        Withdraw
        {onOpen && <ModalForm isOpen={isOpen} onClose={onClose} tittle={'Withdraw'} onWithdraw={handleWithdraw} />}
      </Button>
    </Td>
  );
};
export default Withdraw;
