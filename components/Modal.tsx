import { useEffect, useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import { useUserContext } from '@utils/context';

const CustomModal = (props:any) => {
  const [opened, setOpened] = useState(props.open ? true : false);
  const {ctx, setCtx} = useUserContext()

  useEffect(()=>{
    setOpened(props.open)
  },[props.open])

  useEffect(()=>{
    if(ctx.connected){
      setOpened(false)
    }
  },[ctx])

  return (
      <Modal
        size={props.size || 'sm'}
        centered={props.centered ? true : false}
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={props.title ? true : false}
        title={props.title}
        style={{...props.style}}
      >
        {props.children}
      </Modal>
  );
}

export default CustomModal