enum Errors {
  NOT_ON_DISPLAY = 'You can not hide the Switchable Component if this is not on Display',
  ON_DISPLAY = 'You can not show the Switchable Component if this is on Display',
  HIDE_OUT_OF_CONTEXT = 'Hide Hook can not be used out of a Switchable Component Context',
  HIDING_OUT_OF_CONTEXT = 'Hiding Hook can not be used out of a Switchable Component Context',
  TOO_MANY_COMPONENTS = 'There are too many Switchable Components of the same type in the React Tree. Make sure there is only one'
}

export default Errors