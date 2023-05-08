import { ActionIcon, AppShell, Group, Header, Navbar, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { MainLinks } from "../shell/_main-links";
import { User } from "../shell/_user";
import { ReactNode } from "react";

export default function AdminDashboardLayout({children}: {children: ReactNode}){
    const { colorScheme, toggleColorScheme} = useMantineColorScheme(); 
    return(
        <AppShell
        padding="md"
        navbar={<Navbar width={{ base: 300 }}  p="xs">
            <Navbar.Section grow mt='md'>
            <MainLinks />
            </Navbar.Section>
            <Navbar.Section>
            <User />
            </Navbar.Section>
        </Navbar>}
        header={
        <Header height={60} p="xs">{/* Header content */}
            <Group sx={{height: "100%"}} px={20} position="apart">
            x
            <ActionIcon
            variant="default"
            onClick={()=> toggleColorScheme()}
            size={30}
            >
                {colorScheme === 'dark' ? (
                <IconSun size="1rem" />
                ) : (
                <IconMoonStars size="1rem" />
                )}
            </ActionIcon>
            </Group>
        </Header>}
        styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
        >
        {/* Your application here */}
        {children}
    </AppShell>
    )
}