import React, { useState } from 'react'
import { Button, Modal } from '@aragon/ui'

import Metamask from '../../assets/metamask.svg'

//Blockchain Integration
import { useConnect, useAccount } from 'wagmi'

export function WalletConnect() {
  const [opened, setOpened] = useState(false)
  const [{ data, error }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  const open = () => setOpened(true)
  const close = () => setOpened(false)

  return (
    <>
      {accountData ? (
        <Button onClick={disconnect}>Disconnect</Button>
      ) : (
        <Button onClick={open}>Connect</Button>
      )}

      <Modal visible={opened} onClose={close} width={60}>
        {data.connectors.map((connector) => (
          <div
            style={{ display: 'flex', justifyContent: 'space-around' }}
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect(connector)}
          >
            <img
              style={{ width: '20%', height: 'auto' }}
              src={Metamask}
              alt="WalletConnect"
            />
            <span
              style={{ padding: '10px', fontSize: '22px', marginRight: '22px' }}
            >
              Metamask
            </span>
          </div>
        ))}
        {error && <div>{error?.message ?? 'Failed to connect'}</div>}
      </Modal>
    </>
  )
}
