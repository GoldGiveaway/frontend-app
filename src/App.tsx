import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Channel {
    id: number;
    link: string;
    name: string;
    photo: string;
    subscribed: boolean;
}

interface Response {
    status: 'error' | 'channels_sub';
    message?: string;
    channels?: Channel[]
}

export default function App() {
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['Index'],
        queryFn: async (): Promise<Response> => {
            const response = await axios.post('http://127.0.0.1:8000/index', { initData: window.Telegram.WebApp.initData });
            return response.data;
        },
    });

    if (isLoading || !data) {
        return <div className={'flex flex-col items-center justify-center text-center mt-10'}>
            <img className={'w-[250px] h-[250px]'} src={'/UtyaDuck-loading.webp'} alt=""/>
            <div className={'font-bold text-xl mt-10'}>Проверка подписок на каналы</div>
            <div className={'font-medium text-lg mt-1 text-white/80'}>Пожалуйста ожидайте пару секунд</div>
        </div>
    } else if (data.status == 'success') {
        window.Telegram.WebApp.MainButton.text = 'Закрыть'
        window.Telegram.WebApp.MainButton.color = '#008000'
        window.Telegram.WebApp.MainButton.onClick(window.Telegram.WebApp.close)
        window.Telegram.WebApp.MainButton.show()
        return <div className={'flex flex-col items-center justify-center text-center mt-10'}>
            <img className={'w-[250px] h-[250px]'} src={'/UtyaDuck-success.webp'} alt=""/>
            <div className={'font-bold text-xl mt-10'}>Вы участвуете</div>
            <div className={'font-medium text-lg mt-1 text-white/80'}>Теперь вы участвуйте, можете закрывать окно</div>
        </div>
    } else if (data.status == 'error') {
        return <div className={'flex flex-col items-center justify-center text-center mt-10'}>
            <img className={'w-[250px] h-[250px]'} src={'/UtyaDuck-error.webp'} alt=""/>
            <div className={'font-bold text-xl mt-10'}>Ошибка!</div>
            <div className={'font-medium text-lg mt-1 text-white/80'}>{data.message}</div>
        </div>
    } else if (data.status == 'channels_sub') {
        return <div className={'flex flex-col items-center justify-center text-center mt-10'}>
            <div className={'font-bold text-xl'}>Подпишитесь на каналы</div>
            <div className={'font-medium text-lg mt-1 text-white/80'}>Пожалуйста подпишитесь на каналы</div>
            <div className={'w-full px-2 space-y-3 mt-10'}>
                {data.channels?.map((channel: Channel) => (
                    <a href={channel.link} className={`flex border ${channel.subscribed ? 'border-green-300/80' : 'border-white/80'} rounded-xl py-3 px-2 items-center justify-center`}>
                        <img className={'w-14 h-14 rounded-2xl'}
                             src={'https://t.me/i/userpic/320/2eioPJ61RI6n7gF3fNMHu5MqfmjcWLHGWryThiFDqdmijYHeGjSRw63IlEku8QQo.svg'}/>
                        <div className={'ml-5'}>
                            <div className={'font-bold text-lg'}>{channel.name}</div>
                            {channel.subscribed ?
                                <div className={'bg-green-600 rounded-md w-full px-2'}>Подписан</div>  :
                                <div className={'bg-blue-600 rounded-md w-full px-2'}>Подписаться</div>
                            }
                        </div>
                    </a>
                ))}
            </div>
        </div>
    }
}
