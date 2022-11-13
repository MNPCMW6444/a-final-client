import { gql, useSubscription } from "@apollo/client";
import Box from "@mui/material/Box";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import drawerWidthSettings from "../../config/drawerWidthSettings";
import {
  addItem,
  editItem,
  removeItem,
} from "../../store/reducers/itemsReducer";
import pageTypeSelector from "../../store/selectors/pageTypeSelector";
import { SubscribtionTypes } from "../../utils/enums";
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
      dispatch(addItem({ ...eventMutation.event }));
    eventMutation &&
      eventMutation.type === SubscribtionTypes.edit &&
      dispatch(editItem({ ...eventMutation.event }));
    eventMutation &&
      eventMutation.type === SubscribtionTypes.delete &&
      dispatch(removeItem(eventMutation.id));
  }, [dispatch, eventMutation]);

  useEffect(() => {
    taskMutation &&
      taskMutation.type === SubscribtionTypes.add &&
      dispatch(addItem({ ...taskMutation.task }));
    taskMutation &&
      taskMutation.type === SubscribtionTypes.edit &&
      dispatch(editItem({ ...taskMutation.task }));
    taskMutation &&
      taskMutation.type === SubscribtionTypes.delete &&
      dispatch(removeItem(taskMutation.id));
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
