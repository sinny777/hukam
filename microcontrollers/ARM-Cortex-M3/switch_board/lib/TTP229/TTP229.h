#ifndef TTP229_H
#define TTP229_H
#include "mbed.h"
#include <bitset>

/** 16key touch keypad\n
 *  Only supported 16key and active low mode\n
 *  jamper settng : TP1=1(jamper2=open):active low, TP2=0(jamper3=close):16key mode\n
 */
class TTP229 {
public:
    ///@param sdopin PinName that support DigitalIn and InterruptIn, connected to TTP229 SDO.
    ///@param sclpin PinName that support DigitalOut, connected to TTP229 SCL.
    TTP229(PinName sdopin, PinName sclpin);
    /// set function that is called at change state of keypad\n
    /// FunctionPointer is a pointer to function(no param and void return)
    /// @code
    /// void func();
    /// ttp229.attach(&func);
    /// @endcode
    /// or to menber function(no param and void return)
    /// @code
    /// class Foo {
    /// public:
    ///     void func();
    /// };
    /// Foo foo;
    /// ttp229.attach(FunctionPointer(&foo, &Foo::func));
    /// @endcode
    void attach(const FunctionPointer& fp) {callback=fp;}
    ///get keypad status
    bitset<16> getkeys() {return sw;}
    ///same as getkeys()
    operator bitset<16>() {return getkeys();}
    ///get keypad status especially singlekey mode(TP3=1,TP4=1)
    ///@return touched keypad number(1~16) or 0:no keypad touched
    int onkey() {return swnum;}
    ///Is number i(0~15) keypad touched?
    bool ison(size_t i) {return getkeys()[i];}
    ///same as ison()
    bool operator[](size_t i) {return ison(i);}
protected:
    void interrupt();
private:
    DigitalIn sdo;
    InterruptIn sdoInt;
    DigitalOut scl;
    FunctionPointer callback;
    bitset<16> sw;
    int swnum;
};

#endif
