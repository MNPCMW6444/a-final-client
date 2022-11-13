import { gql, useSubscription } from "@apollo/client";
import Box from "@mui/material/Box";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import drawerWidthSettings from "../../config/drawerWidthSettings";
import { mutate } from "../../store/reducers/itemsReducer";

import pageTypeSelector from "../../store/selectors/pageTypeSelector";
import { Mutations, SubscribtionTypes } from "../../utils/enums";
import GenericTable from "../GenericTable/GenericTable";
import SideBar from "../SideBar/SideBar";

interface GenericPageProps {
  columns: Map<string, string> | undefined;
  commonProps: {
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
    drawerOpen: boolean;
  };
}

const navigationStyle = {
  width: { sm: drawerWidthSettings.width },
  flexShrink: { sm: 0 },
};

const taskMutationSubscription = gql`
  subscription Subscription {
    taskMutation {
      type
      task {
        _id
        title
        description
        estimatedTime
        status
        priority
        untilDate
        review
        timeSpent
      }
      id
    }
  }
`;

const eventMutationSubscription = gql`
  subscription Subscription {
    eventMutation {
      type
      event {
        _id
        title
        description
        beginningTime
        endingTime
        color
        invitedGuests
        location
        notificationTime
      }
      id
    }
  }
`;

export default function GenericPage({
  commonProps,
  columns,
}: GenericPageProps) {
  const { setDrawerOpen, drawerOpen } = commonProps;

  const pageType = useSelector(pageTypeSelector);

  const eventMutationData = useSubscription(eventMutationSubscription).data;
  const eventMutation = eventMutationData && eventMutationData.eventMutation;

  const taskMutationData = useSubscription(taskMutationSubscription).data;
  const taskMutation = taskMutationData && taskMutationData.taskMutation;

  const dispatch = useDispatch();

  useEffect(() => {
    eventMutation &&
      eventMutation.type === SubscribtionTypes.add &&
      dispatch(
        mutate({
          payload: { variables: { newItem: { ...eventMutation.event } } },
          type: Mutations.addEvent,
        })
      );
    eventMutation &&
      eventMutation.type === SubscribtionTypes.edit &&
      dispatch(
        mutate({
          payload: { variables: { newItem: { ...eventMutation.event } } },
          type: Mutations.editEvent,
        })
      );
    eventMutation &&
      eventMutation.type === SubscribtionTypes.delete &&
      dispatch(
        mutate({
          payload: { variables: { newItem: { ...eventMutation.id } } },
          type: Mutations.deleteEvent,
        })
      );
  }, [dispatch, eventMutation]);

  useEffect(() => {
    taskMutation &&
      taskMutation.type === SubscribtionTypes.add &&
      dispatch(
        mutate({
          payload: { variables: { newItem: { ...taskMutation.event } } },
          type: Mutations.addTask,
        })
      );
    taskMutation &&
      taskMutation.type === SubscribtionTypes.edit &&
      dispatch(
        mutate({
          payload: { variables: { newItem: { ...taskMutation.event } } },
          type: Mutations.editTask,
        })
      );
    taskMutation &&
      taskMutation.type === SubscribtionTypes.delete &&
      dispatch(
        mutate({
          payload: { variables: { newItem: { ...taskMutation.id } } },
          type: Mutations.deleteTask,
        })
      );
  }, [dispatch, taskMutation]);

  return (
    <Box>
      <GenericTable columns={columns} pageType={pageType} />
      <Box component="nav" sx={navigationStyle}>
        <SideBar
          pageType={pageType}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      </Box>
    </Box>
  );
}
