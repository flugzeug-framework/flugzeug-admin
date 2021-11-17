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

  return (
    <Modal open={isOpen} onClose={() => onClose()}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        maxWidth="95%"
        width="95%"
        height="calc(100vh - 32px)"
        maxHeight="calc(100vh - 32px)"
      >
        <Card>
          <Box display="flex" justifyContent="flex-end" padding="8px 16px 0 0">
            <IconButton aria-label="Close" onClick={onClose}>
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
            <EntityModalForm module={modelName} onCreate={handleCreateEntity} />
          )}
        </Card>
      </Box>
    </Modal>
  );
}
