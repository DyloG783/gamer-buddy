export default function AboutYou() {


    return (
        <div className="flex flex-col p-2">
            <label htmlFor="bio">About you</label>
            <textarea id="bio" minLength={10} maxLength={500}
                className="border-cyan-700 border-2 md:h-[15vh]"
                placeholder='Share something about yourself i.e. "My favourate genre is build/craft survival games." Or "Usually available to play between 6pm - 10pm weekdays in my timezone."'
            />

        </div>
    )
}