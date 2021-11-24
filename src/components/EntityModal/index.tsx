import { Close } from "@mui/icons-material";
import { Box, Card, IconButton, Modal } from "@mui/material";
import React, { useState } from "react";
import { EntityModalForm } from "./EntityModalForm";
import { EntityModalTable } from "./EntityModalTable";

interface EntityModalProps {
  isOpen: boolean;
  modelName: string;
  onSelectOption: (id: string) => void;
  onClose: VoidFunction;
}

export function EntityModal({
  isOpen,
  modelName,
  onSelectOption,
  onClose,
}: EntityModalProps) {
  const [isTable, setIsTable] = useState(true);

  const handleChangeToForm = () => setIsTable(false);

  const handleCreateEntity = (id: string) => {
    onSelectOption(id);
    setIsTable(true);
  };

  const handleClose = () => {
    onClose();
    setIsTable(true);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100vh"
      >
        <Card>
          <Box maxHeight="100vh" overflow="scroll">
            <Box
              display="flex"
              justifyContent="flex-end"
              padding="8px 16px 0 0"
            >
              <IconButton aria-label="Close" onClick={handleClose}>
                <Close color="primary" />
              </IconButton>
            </Box>
            {isTable ? (
              <EntityModalTable
                moduleName={modelName}
                onClicKOption={onSelectOption}
                onClickCreate={handleChangeToForm}
              />
            ) : (
              <EntityModalForm
                module={modelName}
                onCreate={handleCreateEntity}
              />
            )}
          </Box>
        </Card>
      </Box>
    </Modal>
  );
}
