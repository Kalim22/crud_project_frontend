import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody, Button,
} from '@chakra-ui/react'

type Props = {
    onClose: () => void,
    isOpen: boolean,
    onSubmit: (e: React.FormEvent) => Promise<any>,
    children: JSX.Element[] | JSX.Element,
    modalTitle: string,
    primaryButtonText: string,
}

const OverlayModal: React.FC<Props> = ({
    onClose,
    isOpen,
    onSubmit,
    children,
    modalTitle,
    primaryButtonText,
 }) => {

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalTitle}</ModalHeader>
                    <form onSubmit={onSubmit}>
                        <ModalBody pb={6}>
                            {children}
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type="submit">
                                {primaryButtonText}
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default OverlayModal

