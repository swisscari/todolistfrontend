import { useState } from 'react';

import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Paper, Tooltip } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CssBaseline from '@mui/material/CssBaseline';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { Show } from './show';
import { Center } from './center';

import { TaskCard } from './tasks/taskCard';
import { TaskForm } from './tasks/taskForm';

import { Task } from '../redux/interfaces/task';
import { useGetQuery } from '../redux/apis/todoApi';

const drawerBleeding = 56;
const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

export default function SwipeableEdgeDrawer({ window }: { window?: () => Window }) {
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState<Task | undefined>(undefined);

    const taskResults = useGetQuery({
        url: '/tasks'
    })

    const container = window !== undefined ? () => window().document.body : undefined;

    const closeDrawer = () => setOpen(false)
    const openDrawer = (task?: Task) => () => {
        setTask(task)
        setOpen(true);
    }

    return (
        <Root>
            <CssBaseline />
            <Box
                sx={{
                    p: '2rem',
                    pb: '5rem', pt: '2rem',
                    display: 'flex',
                    overflow: 'auto',
                    top: 0, right: 0,
                    scrollbarWidth: 0,
                    bottom: 0, left: 0,
                    position: 'absolute',
                    alignItems: 'center',
                    alignContent: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                    scrollbarColor: 'revert-layer',
                    '&::-webkit-scrollbar': {
                        width: 0,
                    },
                }}
            >
                <Center>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Show
                            when={!taskResults.isLoading}
                            fallback={<p>Cargando...</p>}
                        >
                            <Show
                                when={taskResults.isSuccess}
                                fallback={<p>Error : {JSON.stringify(taskResults.error)}</p>}
                            >
                                <Show
                                    when={!!taskResults.currentData?.length}
                                    fallback={<p>No tasks...</p>}
                                >
                                    {taskResults.data?.map((task: Task, index: number) => {
                                        return (
                                            <Grid item key={index} xs={12} sm={4}>
                                                <TaskCard
                                                    task={task}
                                                    openDrawer={openDrawer}
                                                    reload={taskResults.refetch}
                                                />
                                            </Grid>
                                        );
                                    })}
                                </Show>
                            </Show>
                        </Show>
                    </Grid>
                </Center>
            </Box>
            <Paper
                elevation={0}
                sx={{
                    padding: 3,
                    display: 'flex',
                    position: 'fixed',
                    justifyContent: 'center',
                    bottom: 0, left: 0, right: 0,
                    backgroundColor: 'transparent',
                }}
            >
                <Tooltip title={"add new Task"}>
                    <Button
                        size='large'
                        variant='contained'
                        onClick={openDrawer()}
                        sx={{
                            bottom: 0,
                            position: 'absolute',
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                        }}
                    >
                        <AddIcon fontSize='large' />
                    </Button>
                </Tooltip>
            </Paper>
            <SwipeableDrawer
                open={open}
                anchor="bottom"
                onOpen={openDrawer()}
                onClose={closeDrawer}
                container={container}
                disableSwipeToOpen={true}
                swipeAreaWidth={drawerBleeding}
                sx={{
                    '& .MuiDrawer-paper': {
                        height: '50%',
                    },
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <TaskForm task={task} reload={taskResults.refetch} closeDrawer={closeDrawer} />
            </SwipeableDrawer>
        </Root >
    );
}
