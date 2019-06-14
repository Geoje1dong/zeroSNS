import React from 'react';
import {Button, List, Card, Icon} from 'antd';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
    return(
        <React.Fragment>
            <NicknameEditForm />
            <List
                grid={{gutter:4, xs:2, md:3}}
                size='small'
                header={<div>팔로워 목록</div>}
                loadMore={<Button>더 보기</Button>}
                bordered
                dataSource={['제로초', '보보', '노드버드오피셜']}
                renderItem={item => (
                    <List.Item >
                        <Card actions={[<Icon key='stop' type='stop' />]}>
                            <Card.Meta description={item} />
                        </Card>
                    </List.Item>
                )}
            />
            <List
                grid={{gutter:4, xs:2, md:3}}
                size='small'
                header={<div>팔로잉 목록</div>}
                loadMore={<Button>더 보기</Button>}
                bordered
                dataSource={['제로초', '보보', '노드버드오피셜']}
                renderItem={item => (
                    <List.Item >
                        <Card actions={[<Icon key='stop' type='stop' />]}>
                            <Card.Meta description={item} />
                        </Card>
                    </List.Item>
                )}
            />
        </React.Fragment>
    )
}

export default Profile