import logo from '/assets/images/logo.svg'
import DropdownButton from './DropdownButton'

const Header = () => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="container flex items-center justify-between py-6 md:mt-8">
      <img src={logo} alt="Weather Now" />
      <DropdownButton />
    </header>
  )
}

export default Header
