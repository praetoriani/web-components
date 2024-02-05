/*
Written by praetoriani
https://github.com/praetoriani/Web-Components
*/

// Define the InfoBanner-Class.
// This extends HTMLElement, which is the base class for all HTML elements.
class TooltipPopupComponent extends HTMLElement {
    // This static getter returns an array of attribute names to be observed for changes
    static get observedAttributes() {
        return ['tpid','size','xaxis','yaxis','zaxis','viewmode'];
    }
    
    // The constructor method is creating and initializing an object created with a class.
    constructor() {
        // Call the constructor of the parent class (HTMLElement).
        super();
        // Attach a shadow root to the custom element. The 'open' mode means that the
        // shadow root can be accessed from JavaScript outside the shadow root.
        this.attachShadow({ mode: 'open' });
        /* Init the vars for our attributes */
        this.varTPID     = "";
        this.varSize     = "";
        this.varXaxis    = "";
        this.varYaxis    = "";
        this.varZaxis    = "";
        this.varViewMode = "";
    }

    // The connectedCallback() lifecycle hook fires
    // when the element gets inserted into the DOM.
    connectedCallback() {
        // Get the user-defined attribute values
        this.CatchAttributes();
        // Call the RenderComponent method when the element is inserted into the DOM.
        this.RenderComponent();
        // RESERVED FOR LATER USE
        //this.addEventListeners();
    }

    CatchAttributes() {
        // Catch the attribute values from the component
        this.varTPID     = this.getAttribute('tpid');
        this.varSize     = this.getAttribute('size');
        this.varXaxis    = this.getAttribute('xaxis');
        this.varYaxis    = this.getAttribute('yaxis');
        this.varZaxis    = this.getAttribute('zaxis');
        this.varViewMode = this.getAttribute('viewmode');
    }

    // The RenderComponent method will generate
    // the HTML content of the custom element.
    RenderComponent() {
        // Set the inner HTML of the shadow root
        this.shadowRoot.innerHTML = `
            <style>
                @import 'tooltip-popup.css';
                /* */
                ::slotted([slot="tooltipheadtext"]) {
                    font-family: inherit;
                    font-weight: inherit;
                    font-style: inherit;
                    font-size: inherit;
                    color: inherit;
                }
                ::slotted([slot="tooltipbodytext"]) {
                    font-family: inherit;
                    font-weight: inherit;
                    font-style: inherit;
                    font-size: inherit;
                    color: inherit;
                }
            </style>

            <div id="${this.varTPID}" class="TooltipPopup">
                <div id="TooltipContent" class="TooltipContent">
                    <table class="TooltipContentTable" cellspacin="0" cellpadding="0">
                        <tr>
                            <td class="TooltipContentTableHead">
                                <slot name="tooltipheadtext"></slot>
                            </td>
                        </tr>
                        <tr>
                            <td class="TooltipContentTableBody">
                                <slot name="tooltipbodytext"></slot>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="TooltipPointer" class="TooltipPointer"></div>
            </div>
        `;
        // Call the update method to update other details
        this.UpdateComponent();
    }

    /*
    This function will update some stuff in our shaddow DOM.
    Due to we have to work with the DOM, we have to do this,
    after the component was 'rendered' inside the shaddow DOM.
    Otherwise our HTML-Elements are not available
    */
    UpdateComponent() {
        // Update the dimension/position of the popup
        let [DimensionX,DimensionY] = this.varSize.split('x');
        this.shadowRoot.getElementById(this.varTPID).style.width  = DimensionX+'px';
        this.shadowRoot.getElementById(this.varTPID).style.height = DimensionY+'px';
        this.shadowRoot.getElementById(this.varTPID).style.top    = this.varXaxis;
        this.shadowRoot.getElementById(this.varTPID).style.left   = this.varYaxis;
        this.shadowRoot.getElementById(this.varTPID).style.zIndex = this.varZaxis;
        
        if( this.varViewMode.toLowerCase() == 'visible' || this.varViewMode.toLowerCase() == 'hidden' ) {
            this.shadowRoot.getElementById(this.varTPID).style.visibility  = this.varViewMode;
        }
    }

    /* for internal use only */
    setDisplayMode(ElementID,vMode) {
        if( this.shadowRoot.getElementById(ElementID) ) {
            if( vMode.toLowerCase() == 'visible' ) {
                this.shadowRoot.getElementById(ElementID).style.visibility = 'visible';
            } else if( vMode.toLowerCase() == 'hidden' ) {
                this.shadowRoot.getElementById(ElementID).style.visibility = 'hidden';
            } else {
                console.error("Error in static UpdateViewMode(ElementID,vMode)",
                "ElementID: "+ElementID+"",
                "vMode: "+vMode+"",
                "vMode must be either 'visible' or 'hidden'"
                );
            }
        } else {
            console.error("Error in static UpdateViewMode(ElementID,vMode)",
            "ElementID: "+ElementID+"",
            "vMode: "+vMode+"",
            "Couldn't find an Element with ID '"+ElementID+"'"
            );
        }
    }
    /* can be called from outside */
    UpdateViewMode(ElementID,vMode) {

        if( this.shadowRoot.getElementById(ElementID) ) {
            if( vMode.toLowerCase() == 'visible' ) {
                this.shadowRoot.getElementById(ElementID).style.visibility = 'visible';
            } else if( vMode.toLowerCase() == 'hidden' ) {
                this.shadowRoot.getElementById(ElementID).style.visibility = 'hidden';
            } else {
                console.error("Error in static UpdateViewMode(ElementID,vMode)",
                "ElementID: "+ElementID+"",
                "vMode: "+vMode+"",
                "vMode must be either 'visible' or 'hidden'"
                );
            }
        } else {
            console.error("Error in static UpdateViewMode(ElementID,vMode)",
            "ElementID: "+ElementID+"",
            "vMode: "+vMode+"",
            "Couldn't find an Element with ID '"+ElementID+"'"
            );
        }
        
    }

    addEventListeners() {
        // RESERVED FOR LATER USE
    }

}
// Define the new custom element. This line will trigger the constructor
// The first argument is the tag name of the new element.
// The second argument is the class that controls its behavior.
window.customElements.define('tooltip-popup', TooltipPopupComponent);