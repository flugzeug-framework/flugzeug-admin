import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { setToast } from "features/toast/toastSlice";
import { EntityModel } from "models/entityModel";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { entityService } from "services/entityService";
import { describeApiError } from "utils/errorUtils";

interface EntityPreviewProps {
  modelName: string;
  id: string;
}

export function EntityPreview({ modelName, id }: EntityPreviewProps) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [entity, setEntity] = useState<EntityModel>({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await entityService(modelName).getById(id);
        setEntity(data);
        setHasError(false);
      } catch (error) {
        dispatch(
          setToast({
            message: describeApiError(error),
            isActive: true,
            type: "error",
          })
        );
        console.error(error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, modelName, dispatch]);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="caption">{`Preview ${modelName}`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box display="flex" flexDirection="column" overflow="scroll">
            {hasError ? (
              <Typography>Not found</Typography>
            ) : (
              Object.entries(entity).map(([key, value]) => (
                <Typography variant="caption">
                  <b>{key}: </b>
                  <span>{value}</span>
                </Typography>
              ))
            )}
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
